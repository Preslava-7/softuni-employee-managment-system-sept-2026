import { useEffect, useState } from "react";

import "./styles.css"
import Header from './components/Header';
import Footer from './components/Footer';
import UserDeleteDialog from './components/UserDeleteDialog';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import UserDetails from './components/UserDetails';
import UserSearch from './components/UserSearch';
import SaveUserModal from "./components/SaveUserModal";

const baseUrl = 'https://vrqllpepfdvrmjlnxlrx.supabase.co/rest/v1/users';
const apiKey = 'sb_publishable_DBue9uphkGNCjR-VH89haQ_2CQSzD_N';

function App() {

    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);

    useEffect(() => {

        fetch('https://vrqllpepfdvrmjlnxlrx.supabase.co/rest/v1/users', {
            headers: {
                'apiKey': 'sb_publishable_DBue9uphkGNCjR-VH89haQ_2CQSzD_N'
            }
        })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users: ", error));
    }, []);

    const addUserClickHandler = () => {
        setShowSaveUserModal(true);
    }

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
    }

    const submitUserHandler = (user) => {
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey
            },
            body: JSON.stringify(user)
        })
        .then(res => console.log('User added: ', res))
        .catch(error => alert('Error adding user: ' + error))
        .finally(() => setShowSaveUserModal(false));
    }

    return (
        <>
            <Header />
            {/* Main component  */}
            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} />

                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                    {showSaveUserModal && <SaveUserModal onClose={addUserCloseHandler} onSubmit={submitUserHandler} />}

                    <Pagination />
                </section>
                {/* User details component  */}

                {/* Create/Edit Form component  */}

                {/* Delete user component  */}
            </main >
            {/* Footer component  */}
            < Footer />
        </>

    );
}

export default App
