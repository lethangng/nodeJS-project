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

const createNewUser = async (req, res) => {
    // console.log('check req: ', req.body)
    const { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);

    return res.redirect('/')
}

const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);

    return res.redirect('/')
}

const getEditPage = async (req, res) => {
    const id = req.params.id;
    const [user, fields] = await pool.execute('select * from users where id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] });
}

const postUpdateUser = async (req, res) => {
    const { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);

    return res.redirect('/')
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser
}