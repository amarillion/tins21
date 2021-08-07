import menuBg from "../assets/images/menu.png";

export class MenuComponent extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
		<style>
			:host {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;

				background-image: url(${menuBg});
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
			}

			button {
				background-color: #4C50AF; /* Blue */
				border: none;
				color: white;
				text-align: center;
				text-decoration: none;
				display: inline-block;
				font-size: 16px;
				margin: 2rem;
				width: 10rem;
				height: 4rem;
			}
			button:hover {
				background-color: #6C70DF; /* Blue */
			}
			.main {
				position: absolute;
				left: 30%;
				top: 20%;
			}
		</style>

		<div class="main">
			<div class="buttonBar">
				<button id="startGame">Start Game</button>
			</div>
		</div>
	`;
	}

	connectedCallback() {
		this.shadowRoot.querySelector("#startGame").addEventListener("click", (event) => {
			this.dispatchEvent(new CustomEvent("Start"));
			this.dispatchEvent(new CustomEvent("button-pressed"));
		});
	}

}
