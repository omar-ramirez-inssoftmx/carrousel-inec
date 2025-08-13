import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export async function createOrder(
  id_alumno: number,
  identificador_pago: string,
  id_cat_estatus: number,
  tipo_pago: string,
  ciclo: number,
  mes: number,
  anio: number,
  pago: number,
  fecha_vigencia_pago: Date,
  link_de_pago: string,
  transaccion_Id: string,
  fecha_carga: Date | null = null,
  fecha_pago: Date | null = null,
  monto_real_pago: number = 0.00
) {
  try {
    const pedido = await prisma.pedidos.create({
      data: {
        id_alumno,
        identificador_pago,
        id_cat_estatus,
        tipo_pago,
        ciclo,
        mes,
        anio,
        pago,
        fecha_vigencia_pago,
        link_de_pago,
        transaccion_Id,
        fecha_carga: fecha_carga || new Date(),
        fecha_pago,
        monto_real_pago
      }
    });

    return pedido
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByMatricula(matricula: string, status: string) {
  try {
    const whereCondition = status === 'completed'
      ? { id_cat_estatus: 1 }
      : { id_cat_estatus: { not: 1 } };

    const pedidos = await prisma.pedidos.findMany({
      where: {
        alumno: {
          matricula
        },
        ...whereCondition
      },
      include: {
        alumno: true,
        cat_estatus: true
      }
    });

    return pedidos.map(pedido => ({
      id_pedido: pedido.id_pedido,
      identificador_pago: pedido.identificador_pago,
      id_cat_estatus: pedido.id_cat_estatus,
      estatus: pedido.cat_estatus.descripcion,
      pago: pedido.pago,
      fecha_vigencia_pago: pedido.fecha_vigencia_pago,
      link_de_pago: pedido.link_de_pago,
      transaccion_Id: pedido.transaccion_Id,
      monto_real_pago: pedido.monto_real_pago,
      mes: pedido.mes,
      anio: pedido.anio,
      fecha_pago: pedido.fecha_pago,
      matricula: pedido.alumno.matricula,
      open_pay_id: pedido.alumno.open_pay_id,
      nombre_alumno: pedido.alumno.nombre,
      apellido_paterno: pedido.alumno.apellido_paterno,
      apellido_materno: pedido.alumno.apellido_materno,
      email: pedido.alumno.email,
      celular: pedido.alumno.celular
    }));
  } catch {
    throw new Error("Error al obtener pedidos por matrícula");
  }
}

export async function getAllOrdersForSurcharge() {
  try {
    const pedidos = await prisma.pedidos.findMany({
      where: {
        id_cat_estatus: 3
      },
      include: {
        alumno: true,
        cat_estatus: true
      }
    });

    return pedidos.map(pedido => ({
      id_pedido: pedido.id_pedido,
      identificador_pago: pedido.identificador_pago,
      id_cat_estatus: pedido.id_cat_estatus,
      estatus: pedido.cat_estatus.descripcion,
      pago: pedido.pago,
      fecha_vigencia_pago: pedido.fecha_vigencia_pago,
      link_de_pago: pedido.link_de_pago,
      transaccion_Id: pedido.transaccion_Id,
      ciclo: pedido.ciclo,
      mes: pedido.mes,
      anio: pedido.anio,
      matricula: pedido.alumno.matricula,
      open_pay_id: pedido.alumno.open_pay_id,
      nombre_alumno: pedido.alumno.nombre,
      apellido_paterno: pedido.alumno.apellido_paterno,
      apellido_materno: pedido.alumno.apellido_materno,
      email: pedido.alumno.email,
      celular: pedido.alumno.celular
    }));
  } catch {
    throw new Error("Error al obtener todos los pedidos por matrícula");
  }
}

export async function getAvailableMonths(matricula: string) {
  try {
    const pedidos = await prisma.pedidos.findMany({
      where: {
        alumno: {
          matricula
        },
        id_cat_estatus: 1,
        fecha_pago: {
          not: null
        }
      },
      select: {
        fecha_pago: true
      },
      distinct: ['mes', 'anio'],
      orderBy: [
        { anio: 'desc' },
        { mes: 'desc' }
      ]
    });

    const months = pedidos.map(pedido => {
      if (!pedido.fecha_pago) return null;

      const date = new Date(pedido.fecha_pago);
      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const month_display = `${monthNames[date.getMonth()]}-${date.getFullYear().toString().slice(-2)}`;
      const month_value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      return { month_display, month_value };
    }).filter(Boolean);

    return [{ month_display: 'Todos', month_value: 'Todos' }, ...months];
  } catch {
    throw new Error("Error al obtener meses disponibles");
  }
}

export async function updateOrders(ids: number[], actualizar: any) {
  try {
    const { identificador_pago, link_de_pago, transaccion_Id } = actualizar;

    const result = await prisma.pedidos.updateMany({
      where: {
        id_pedido: {
          in: ids
        }
      },
      data: {
        identificador_pago,
        link_de_pago,
        transaccion_Id
      }
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateOrderStatus(id: number, status: number, pedido: any) {
  try {
    const isCompleted = status === 1;
    const fechaPago = isCompleted && pedido.operation_date
      ? new Date(pedido.operation_date)
      : undefined;

    const updateData: any = {
      id_cat_estatus: status,
      monto_real_pago: pedido.amount,
      transaccion_Id: pedido.id
    };

    if (isCompleted && fechaPago) {
      updateData.fecha_pago = fechaPago;
    }

    const result = await prisma.pedidos.update({
      where: {
        id_pedido: id
      },
      data: updateData
    });

    return result;
  } catch {
    throw new Error("Error al actualizar el pedido");
  }
}

export async function updateOrderSurcharge(id: number, pago: number) {
  try {
    const result = await prisma.pedidos.update({
      where: {
        id_pedido: id
      },
      data: {
        pago
        // NO actualizar fecha_vigencia_pago - debe mantenerse original para la lógica de recargos
      }
    });

    return result;
  } catch {
    throw new Error("Error al actualizar los pedidos recargo");
  }
}

export async function cancelOrdersPaymentData(ids: number[]) {
  try {
    const result = await prisma.pedidos.updateMany({
      where: {
        id_pedido: {
          in: ids
        }
      },
      data: {
        identificador_pago: null,
        link_de_pago: null,
        transaccion_Id: null
      }
    });

    return result;
  } catch (error) {
    throw new Error("Error al cancelar los datos de pago de los pedidos");
  }
}