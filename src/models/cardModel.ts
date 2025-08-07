import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export async function createCardForStudent(
  id_alumno: number,
  numero_tarjeta: string,
  token: string,
  nombre_tarjeta: string,
  tipo: string,
  titular: string,
  vencimiento: string
) {
  try {
    const tarjeta = await prisma.tarjetas.create({
      data: {
        id_alumno,
        numero_tarjeta,
        token,
        nombre_tarjeta,
        tipo,
        titular,
        vencimiento,
        activa: false,
        eliminada: false
      }
    });

    return tarjeta;
  } catch (error) {
    throw error;
  }
}

export async function getStudentCardsByMatricula(matricula: string) {
  try {
    const result = await prisma.alumno.findFirst({
      where: { matricula },
      include: {
        tarjetas: {
          where: { eliminada: false },
          select: {
            id: true,
            numero_tarjeta: true,
            titular: true,
            vencimiento: true,
            nombre_tarjeta: true,
            tipo: true,
            activa: true,
            token: true
          }
        }
      }
    });

    if (!result) return [];

    return result.tarjetas.map(tarjeta => ({
      id_alumno: result.id_alumno,
      nombre: result.nombre,
      matricula: result.matricula,
      id_tarjeta: tarjeta.id,
      numero_tarjeta: tarjeta.numero_tarjeta,
      titular: tarjeta.titular,
      vencimiento: tarjeta.vencimiento,
      nombre_tarjeta: tarjeta.nombre_tarjeta,
      tipo: tarjeta.tipo,
      activa: tarjeta.activa,
      token: tarjeta.token
    }));
  } catch {
    throw new Error("Error al obtener tarjetas del alumno");
  }
}

export async function activateStudentCard(id_tarjeta: number, id_alumno: number) {
  try {
    // Desactivar todas las tarjetas del alumno
    await prisma.tarjetas.updateMany({
      where: { id_alumno },
      data: { activa: false }
    });

    // Activar la tarjeta específica
    const result = await prisma.tarjetas.updateMany({
      where: {
        id: id_tarjeta,
        id_alumno
      },
      data: { activa: true }
    });

    return {
      success: true,
      affectedRows: result.count,
      message: `Tarjeta ${id_tarjeta} activada y demás tarjetas desactivadas`
    };
  } catch (error) {
    throw error;
  }
}

export async function deleteStudentCard(token: string, id_alumno: number) {
  try {
    const result = await prisma.tarjetas.updateMany({
      where: {
        token,
        id_alumno
      },
      data: {
        activa: false,
        eliminada: true
      }
    });

    if (result.count === 0) {
      throw new Error('No se encontró la tarjeta o no pertenece al alumno');
    }

    return {
      success: true,
      affectedRows: result.count,
      message: `Tarjeta ${token} desactivada y marcada como eliminada`
    };
  } catch {
    throw new Error("Error al desactivar la tarjeta");
  }
}