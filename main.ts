import { props, withComponent } from "skatejs";
import withLitHtml from "@skatejs/renderer-lit-html";
import { html } from "lit-html";

interface IPosition {
  x: number;
  y: number;
}
interface IProps {
  name: string;
}
interface IState {
  value: string;
  position: IPosition
}

class WithLitHtml extends withComponent(withLitHtml()) {
  state: IState = {
    value: "",
    position: {
      x: 0,
      y: 0
    }
  };

  static get props() {
    return {
      name: props.string
    };
  }

  connecting() {
    this.addEventListener('mousemove', (e: MouseEvent) => {
      this.state = {
        ...this.state,
        position: {
          x: e.clientX,
          y: e.clientY
        }
      }
    })
  }

  shouldUpdate(prevProps: IProps, prevState: IState) {
    return prevState !== this.state
  }

  change() {
    this.state = { ...this.state, value: "Hey There!" };
  }

  render({ props, state }: { props: IProps, state: IState }) {
    return html`
      <section>
        <h1>Hello, ${props.name}!</h1>
        <h2>X: ${state.position.x}, Y:${state.position.y}</h2>
        <p>${state.value}</p>
      </section>
      <style>
      section {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      </style>
    `;
  }
}

customElements.define("with-lit-html", WithLitHtml);
