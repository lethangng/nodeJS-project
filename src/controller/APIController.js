import pool from "../configs/connectDB"

const getAllUsers = async (req, res) => {
    // http
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

const createNewUser = async (req, res) => {
    const { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'ok'
    })
}

const updateUser = async (req, res) => {
    const { firstName, lastName, email, address, id } = req.body;

    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('delete from users where id = ?', [userId]);

    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}