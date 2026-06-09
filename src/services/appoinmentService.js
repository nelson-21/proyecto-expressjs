const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserAppoinments = async (userId) => {
    try {
        const appoinments = await prisma.appointment.findMany({
            where: { userId: parseInt(userId) },
            include: { timeBlock: true}
        });
        return appoinments;
    }catch (error){
        throw new Error('Error al obtener el historial de citas');
    }
};