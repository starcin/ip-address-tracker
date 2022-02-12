import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useState } from "react"

export default function Home(props) {
	const [ipAdd, setIpAdd] = useState("")
	const [ipData, setIpData] = useState()

	const onIpSubmit = async (e) => {
		e.preventDefault()
		// console.log("submitted:", ipAdd)
		// Böyle adres sonuna '?' koyarak mı yapılıyor bu işler?
		const response = await fetch(`/api/ip_data?ipAdd=${ipAdd}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
		setIpData(await response.json())
		// console.log(api_key)
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<form className="form" onSubmit={onIpSubmit}>
					<div className="form-control">
						<label className="lbl">IP Address:</label>
						<input
							type="text"
							placeholder="Leave empty for current IP"
							onChange={(e) => setIpAdd(e.target.value)}
						/>
					</div>
				</form>
				{ipData && (
					<div>
						{/* {ipData} */}
						<h1>{ipData.city}</h1>
						<h2>{ipData.IPv4}</h2>
					</div>
				)}

				{ipData && (
					<iframe
						style={{ width: 100 + "%", height: 50 + "vh", border: 0 }}
						loading="lazy"
						src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${ipData.latitude},${ipData.longitude}&zoom=12`}
						// src={`https://www.google.com/maps/embed/v1/view?key=${process.env.GOOGLE_MAPS_API_KEY}&center=39,37&zoom=12`}
					></iframe>
				)}
			</main>
		</div>
	)
}
