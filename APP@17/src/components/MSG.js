
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

function MSG() {
	// const [ state, setState ] = useState()
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
            console.log("jol");
			socketRef.current = io.connect("http://localhost:8000")
			socketRef.current.on("hex2", ( message) => {
                console.log("cc");
				setChat([ ...chat, { message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)



	const renderChat = () => {
		return chat.map(({ message }, index) => (
			<div key={index}>
				<h3>
					<span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div>
			<div>
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
	)
}

export default MSG
