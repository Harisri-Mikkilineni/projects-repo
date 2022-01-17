import { useEffect, useState } from "react";

export default function FindUser() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("FindUser just mounted");
    }, []);

    useEffect(() => {
        let abort = false;
        console.log("useEffect mounted");

        if (!search) {
            fetch("/recentUsers").then((res) =>
                res.json().then((data) => {
                    console.log("these are the latest users", data);
                    setUsers(data);
                })
            );
        } else {
            fetch(`/users/${search}`)
                .then((res) => res.json())
                .then((users) => {
                    if (!abort) {
                        console.log("users in the search", users);
                        setUsers(users);
                    }
                });
        }
        return () => {
            abort = true;
        };
    }, [search]);

    const imageError = (e) => {
        e.currentTarget.setAttribute("src", "default.png");
    };

    return (
        <>
            <h3>Checkout who just joined!</h3>

            <span>
                {users.map((user) => (
                    <div className="search-results" key={user.id}>
                        <img
                            className="search-pic"
                            src={user.image_url}
                            onError={imageError}
                        />
                        <h3 className="search-name">
                            {user.first} {user.last}
                        </h3>
                    </div>
                ))}
            </span>

            <h3>Are you looking for someone in particular?</h3>
            <input
                onChange={(e) => setSearch(e.target.value)}
                name="find_people"
                placeholder="Enter name"
                type="text"
            />
        </>
    );
}
