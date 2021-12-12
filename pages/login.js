import styles from "../styles/Login.module.css"
import Head from "next/head"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { magic } from "../lib/magic-client"



const Login = () => {

    const router = useRouter()
    const [userMsg, setUserMsg] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }
        router.events.on("routeChangeComplete",
            handleComplete)
        router.events.on("routeChangeError",
            handleComplete)
        
        return () => {
            router.events.off("routeChangeComplete",
            handleComplete)
            router.events.off("routeChangeError",
            handleComplete)
        }
    }, [router])


    const handleLoginWithEmail = async (e) => {
        e.preventDefault()
        if (email) {
            if (email == "www.belegic@gmail.com") {
                setIsLoading(true)
                try {
                    const didToken = await magic.auth.loginWithMagicLink({ email: email });
                    console.log(didToken);
                    if (didToken) {
                        router.push("/")
                    }
                } catch(error) {
                    // Handle errors if required!
                    console.error(error.message)
                    setIsLoading(false)
                }
            } else {
                setUserMsg("Something went wrong")
            }
        } else {
            setUserMsg("Enter a valid Email address")
        }
    }
    const handleOnChangeEmail = (e) => {
        setUserMsg("")
        const email = e.target.value;
        setEmail(email)
   
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Sign in</title>
            </Head>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a className={styles.logoLink}>
                        <div className={styles.logoWrapper}>
                            <Image src="/static/images/netflix_logo.png" alt="netflix logo" width={128} height={34} />
                        </div>
                    </a>
               </div>
            </header>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signinHeader}>Sign in</h1>
                    <input className={styles.emailInput} type="email" onChange={handleOnChangeEmail} placeholder="Email address" />
                    <p className={styles.userMgs}>{ userMsg}</p>
                    <button className={styles.loginBtn} onClick={handleLoginWithEmail}>{isLoading?"Loading...":"Sign In"}</button>
                </div>
            </main>
        </div>
    )
}

export default Login
