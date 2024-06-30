import adminData from "../models/Admin.js";
//Liste
export const getAdmin = async (req, res) => {
    try {
        const allAdmin = await adminData.find();
        res.status(200).json(allAdmin);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//by id

export const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await adminData.findById(id);

        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//Ajout
export const ajoutAdmin = async (req, res) => {
    const admin = req.body;

    const newAdmin = new adminData(admin);
    try {
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//Supprimer
export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        await adminData.findByIdAndRemove(id).exec();
        res.send("suprimer");
    } catch (error) {
        console.log(error);
    }
}
//update admin

export const updateAdmin = async (req, res, next) => {
    const id = req.params.id;
    const admin = req.body;
    try {
        await adminData.findByIdAndUpdate(id, admin).exec();
        res.send("Modifier");
    } catch (error) {
        console.log(error);
    }

}

//update