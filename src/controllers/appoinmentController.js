const appoinmentService = require('../services/appoinmentService');

exports.getUserAppoinments = async (req, res) => {
    try {
        const userId = req.params.id;
        const appoinments = await appoinmentService.getUserAppoinments(userId);
        res.json(appoinments);
    }catch (error) {
        res.status(500).json({ error: 'Error al obtener el hsitorial de citas '});
    }
};