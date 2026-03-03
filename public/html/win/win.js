let zCounter = 1000;

class Win98Window extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://unpkg.com/98.css');

        :host {
          display: block;
          position: absolute;
          min-width: 200px;
          min-height: 150px;
          top: 50px;
          left: 50px;
        }

        .window {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .title-bar {
          cursor: move;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
        }

        .window-content-area {
          padding: 10px;
          overflow: auto;
          flex-grow: 1;
        }
      </style>

      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text"></div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>

        <div class="window-content-area">
          <slot></slot>
        </div>
      </div>
    `;

    // Drag bindings
    this.dragStart = this.dragStart.bind(this);
    this.dragging = this.dragging.bind(this);
    this.dragEnd = this.dragEnd.bind(this);

    // Drag state
    this.offsetX = 0;
    this.offsetY = 0;
    this.active = false;

    // Drag delay
    this.dragDelayTimer = null;
    this.dragDelay = 300; // 0.2 seconds

    // Maximize state
    this.isMaximized = false;
    this.restoreState = null;
  }

  connectedCallback() {
    this.updateTitle();

    const titleBar = this.shadowRoot.querySelector('.title-bar');
    titleBar.addEventListener('mousedown', this.dragStart);

    document.addEventListener('mousemove', this.dragging);
    document.addEventListener('mouseup', this.dragEnd);

    const [minBtn, maxBtn, closeBtn] =
      this.shadowRoot.querySelectorAll('.title-bar-controls button');

    minBtn.addEventListener('click', () => {
      this.style.display = 'none';
    });

    maxBtn.addEventListener('click', () => {
      this.toggleMaximize();
    });

    closeBtn.addEventListener('click', () => {
      this.remove();
    });
  }

  disconnectedCallback() {
    const titleBar = this.shadowRoot.querySelector('.title-bar');
    if (titleBar) {
      titleBar.removeEventListener('mousedown', this.dragStart);
    }

    document.removeEventListener('mousemove', this.dragging);
    document.removeEventListener('mouseup', this.dragEnd);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title' && oldValue !== newValue) {
      this.updateTitle();
    }
  }

  updateTitle() {
    const titleBarText = this.shadowRoot.querySelector('.title-bar-text');
    if (titleBarText) {
      titleBarText.textContent = this.getAttribute('title') || 'New Window';
    }
  }

  // ========================
  // MAXIMIZE / RESTORE
  // ========================
  toggleMaximize() {
    if (!this.isMaximized) {
      const rect = this.getBoundingClientRect();

      this.restoreState = {
        left: this.style.left || rect.left + 'px',
        top: this.style.top || rect.top + 'px',
        width: this.style.width || rect.width + 'px',
        height: this.style.height || rect.height + 'px'
      };

      this.style.left = '0px';
      this.style.top = '0px';
      this.style.width = window.innerWidth + 'px';
      this.style.height = window.innerHeight + 'px';

      this.isMaximized = true;
    } else {
      if (this.restoreState) {
        this.style.left = this.restoreState.left;
        this.style.top = this.restoreState.top;
        this.style.width = this.restoreState.width;
        this.style.height = this.restoreState.height;
      }

      this.isMaximized = false;
    }

    this.style.zIndex = ++zCounter;
  }

  // ========================
  // DRAGGING (0.2s delay)
  // ========================
  dragStart(e) {
    if (e.button !== 0) return;
    if (this.isMaximized) return;

    const rect = this.getBoundingClientRect();
    this.offsetX = e.clientX - rect.left;
    this.offsetY = e.clientY - rect.top;

    // Start delay timer
    this.dragDelayTimer = setTimeout(() => {
      this.active = true;
      this.style.zIndex = ++zCounter;
    }, this.dragDelay);

    e.preventDefault();
  }

  dragging(e) {
    if (!this.active) return;

    const newX = e.clientX - this.offsetX;
    const newY = e.clientY - this.offsetY;

    this.style.left = `${newX}px`;
    this.style.top = `${newY}px`;
  }

  dragEnd() {
    clearTimeout(this.dragDelayTimer);
    this.dragDelayTimer = null;
    this.active = false;
  }
}

customElements.define('window-98', Win98Window);

document.addEventListener("DOMContentLoaded", function () {

    function toggleStartMenu() {
        const menu = document.getElementById("startMenu");
        if (!menu) return;
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }

    window.toggleStartMenu = toggleStartMenu;

    function updateClock() {
        const clock = document.getElementById("clock");
        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12

        minutes = minutes < 10 ? "0" + minutes : minutes;

        clock.textContent = `${hours}:${minutes} ${ampm}`;
    }

    // Run immediately so it doesn't wait 1 second
    updateClock();

    // Update every second
    setInterval(updateClock, 1000);

    const cmdinput = document.getElementById("cmd-input");
    const cmdarginput = document.getElementById("cmd-arginput");
    const cmdexec = document.getElementById("cmd-exec");

    cmdexec.addEventListener('click', () => {
      let input = cmdinput.value;
      let cmd_win;
      switch (input) {
        case "newwin" :
          if (typeof(cmd_win) == "element") { return; }
          cmd_win = document.createElement("window-98")
          cmd_win.setAttribute("title", "win");
          cmd_win.setAttribute("id", "cmd-newwin_element")
          document.body.appendChild(cmd_win);
          
        case "titlewin" :
          if (!typeof(cmd_win) == "element") { return; }
          let retitle_win_text = cmdarginput.value;
          cmd_win.setAttribute("title", retitle_win_text)
        case "addbodywin" :
          if (!typeof(cmd_win) == "element") { return; }
          let addbody_win_text = cmdarginput.value;
          let addbody_win_el = document.createElement("window-98")
          
      }
    });

    function toggleElement(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.toggle('hidden'); // Toggles the 'hidden' class
      } else {
        console.error(`Element with ID "${elementId}" not found.`);
      }
    }
});