import styles from "./navbar.module.css"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { magic } from "../../lib/magic-client"

const Navbar = () => {
    const router = useRouter()
    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const { email } = await magic.user.getMetadata();
                if (email) {
                    setUsername(email)

                }
            } catch (error) {
                // Handle errors if required!
                console.error(error.message)
            }
        }
        fetchData()
    }, [username])
   

    const handleOnClickHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const handleSignOut = async (e) => {
        e.preventDefault()

        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // => `false`
            router.push("/login")
        } catch (error) {
            console.error(error.message)
        }
    }
    const handleOnClickMyList = (e) => {
        e.preventDefault()
        router.push("/browse/my-list")
    }

    const handleShowDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
    }
    
    return (
        <div className={styles.container}>
            
            <div className={styles.wrapper}>
                <a  className={styles.logoLink}>
                    <div className={styles.logoWrapper}>
                        <Image src="/static/images/netflix_logo.png" alt="netflix logo" width={128} height={34} />
                    </div>
                </a>

            <ul className={styles.navItems}>
                <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
            </ul>

            <nav className={styles.navContainer}>
                <div>
                    <button onClick={handleShowDropdown} className={styles.usernameBtn}>
                            <p className={styles.username}>{username}</p>
                            <Image src="/static/images/expand_more.svg" alt="expand more icon" width={24} height={24} />
                        </button>
                        

                        {showDropdown && 
                            <div className={styles.navDropdown}>
                                <div>
                                    <a onClick={handleSignOut} className={styles.llinkName}>Sign out</a>

                                    <div className={styles.lineWrapper}>

                                    </div>
                                </div>
                            </div>}
                </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
