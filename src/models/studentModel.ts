import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export async function createStudent(
  matricula: string,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  email: string,
  celular: string,
  openPayId: string
) {
  try {
    const existingAlumno = await prisma.alumno.findFirst({
      where: { matricula },
      select: { id_alumno: true }
    });

    if (!existingAlumno) {
      const alumno = await prisma.alumno.create({
        data: {
          matricula,
          nombre,
          apellido_paterno,
          apellido_materno,
          email,
          celular,
          open_pay_id: openPayId,
          fecha_alta: new Date(),
          fecha_modificacion: new Date()
        }
      });
      
      return alumno.id_alumno;
    } else {
      return existingAlumno.id_alumno;
    }
  } catch (error) {
    throw error;
  }
}

export async function getStudentByMatricula(matricula: string) {
  try {
    const alumno = await prisma.alumno.findFirst({
      where: { matricula }
    });

    if (!alumno) return null;

    return [alumno];
  } catch (error) {
    console.error('Error en getStudentByMatricula:', error);
    throw new Error(`Error al obtener la matrícula: ${error}`);
  }
}

export async function getStudentByOpenPayId(customer_id: string) {
  try {
    const alumno = await prisma.alumno.findFirst({
      where: { open_pay_id: customer_id }
    });

    if (!alumno) return null;

    return [alumno];
  } catch (error) {
    console.error('Error en getStudentByOpenPayId:', error);
    throw new Error(`Error al obtener el alumno por OpenPay ID: ${error}`);
  }
}