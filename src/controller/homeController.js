import pool from "../configs/connectDB"

const getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', { dataUser: rows })
}

const getDetailPage = async (req, res) => {
    const userId = req.params.id;
    const [user, fields] = await pool.execute('select * from users where id = ?', [userId]);

    return res.send(JSON.stringify(user))
}

module.exports = {
    getHomePage,
    getDetailPage
}