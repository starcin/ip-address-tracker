import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useState } from "react"

export default function Home(props) {
	const [ipAdd, setIpAdd] = useState("")
	const [ipData, setIpData] = useState()

	const onIpSubmit = async (e) => {
		e.preventDefault()
		console.log("submitted:", ipAdd)
		// Böyle adres sonuna '?' koyarak mı yapılıyor bu işler?
		const response = await fetch(`/api/ip_data?ipAdd=${ipAdd}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
		setIpData(await response.json())
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<form className="form" onSubmit={onIpSubmit}>
					<div className="form-control">
						<label className="lbl">IP Address:</label>
						<input
							type="text"
							placeholder="127.0.0.1"
							onChange={(e) => setIpAdd(e.target.value)}
						/>
					</div>
				</form>
				{ipData && (
					<div>
						<h1>{ipData.city}</h1>
						<h2>{ipData.IPv4}</h2>
					</div>
				)}
			</main>
		</div>
	)
}
