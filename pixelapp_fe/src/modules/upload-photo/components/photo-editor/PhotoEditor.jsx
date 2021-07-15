import React from "react";
import ReactDOM from "react-dom";
import { Brush } from "@material-ui/icons";

export default class PhotoEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      photo: null,
      filterContext: null,
      imageObj: null,
      canvasWidth: null,
      canvasHeight: null,
      //filters
      grayscale: 0,
      blur: 0,
      brightness: 100,
      contrast: 100,
      hueRotate: 0,
      invert: 0,
      saturate: 100,
      sepia: 0,
      //Draw
      drawSize: 3,
      colorDraw: "#ff0000",
      drawTool: "draw"
    };
    this.drawCanvas = null;
    this.drawContext = null;
  }

  componentDidUpdate() {
    if (!this.state.open || !this.state.photo) return;

    let filterCanvas = ReactDOM.findDOMNode(this._filterCanvas);
    let filterContext = filterCanvas.getContext("2d");
    let imageObj = new Image();
    imageObj.src = `${this.props.photo}`;
    imageObj.onload = () => {
      filterContext.drawImage(
        imageObj,
        0,
        0,
        this.state.canvasWidth,
        this.state.canvasHeight
      );
    };

    //Filters
    filterContext.filter = `grayscale(${this.state.grayscale}%) 
      blur(${this.state.blur}px)
      brightness(${this.state.brightness}%)
      contrast(${this.state.contrast}%)
      hue-rotate(${this.state.hueRotate}deg)
      invert(${this.state.invert}%)
      saturate(${this.state.saturate}%)
      sepia(${this.state.sepia}%)`;

    filterContext.drawImage(
      imageObj,
      0,
      0,
      this.state.canvasWidth,
      this.state.canvasHeight
    );

    //Draw
    let drawCanvas = ReactDOM.findDOMNode(this._drawCanvas);
    let drawContext = drawCanvas.getContext("2d");
    this.draw(drawCanvas, drawContext);
    this.drawCanvas = drawCanvas;
    this.drawContext = drawContext;
  }

  componentWillReceiveProps() {
    this.reset();
    this.setState({
      photo: this.props.photo
    });
  }

  render() {
    return (
      <div>
        <Brush
          className="modal-btn"
          onClick={this.openModal}
        />
        {this.state.open ? (
          <div
            className="modal-photo-editor"
            ref={el => {
              this._modal = el;
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <span
                  className="close"
                  onClick = {() => {
                    this.setState({ open: false });
                  }}
                >
                  &times;
                </span>
                <span className="title">Image Editor</span>
              </div>
              <div className="modal-body">
                <div className="sliders">
                  <div className="filter">
                    <span className="filter-name">Grayscale</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="set"
                      value={this.state.grayscale}
                      onChange={e => {
                        this.setState({ grayscale: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Blur</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      className="set"
                      value={this.state.blur}
                      onChange={e => {
                        this.setState({ blur: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Exposure</span>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      className="set"
                      value={this.state.brightness}
                      onChange={e => {
                        this.setState({ brightness: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Contrast</span>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      className="set"
                      value={this.state.contrast}
                      onChange={e => {
                        this.setState({ contrast: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Hue Rotate</span>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      className="set"
                      value={this.state.hueRotate}
                      onChange={e => {
                        this.setState({ hueRotate: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Invert</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="set"
                      value={this.state.invert}
                      onChange={e => {
                        this.setState({ invert: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Saturate</span>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      className="set"
                      value={this.state.saturate}
                      onChange={e => {
                        this.setState({ saturate: e.target.value });
                      }}
                    />
                  </div>

                  <div className="filter">
                    <span className="filter-name">Sepia</span>
                    <input
                      type="range"
                      className="set"
                      min="0"
                      max="100"
                      value={this.state.sepia}
                      onChange={e => {
                        this.setState({ sepia: e.target.value });
                      }}
                    />
                  </div>

                  <div className="draw filter">
                    <span className="filter-name">Draw</span>
                    <input
                      type="color"
                      value={this.state.colorDraw}
                      className="set drowSet"
                      onChange={e =>
                        this.setState({ colorDraw: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="set drowSet sizeDraw"
                      placeholder="Size"
                      onChange={e =>
                        this.setState({ drawSize: e.target.value })
                      }
                    />
                    <img
                      className="eraser"
                      onClick={this.drawTool}
                      alt="eraser"
                      src="https://png.icons8.com/material/50/000000/eraser.png"
                    />
                  </div>

                  <div className="addText filter">
                    <span className="textSpan filter-name">Add text:</span>
                    <form onSubmit={this.addText}>
                      <input
                        type="text"
                        autoComplete="off"
                        name="textField"
                        className="set addTextSet textField"
                        placeholder="Text"
                      />
                      <br />
                      <input
                        type="text"
                        autoComplete="off"
                        name="x"
                        placeholder="X"
                        className="set addTextSet"
                      />
                      <input
                        type="text"
                        autoComplete="off"
                        name="y"
                        placeholder="Y"
                        className="set addTextSet"
                      />
                      <input
                        type="text"
                        autoComplete="off"
                        name="size"
                        className="set addTextSet sizeInput"
                        placeholder="Size"
                      />
                      <button type="submit" className="addTextBtn">
                        Add
                      </button>
                    </form>
                  </div>

                  <button className="photo-editor-btn" onClick={this.reset}>
                    Reset
                  </button>

                  <button className="photo-editor-btn" onClick={this.save}>
                    Save
                  </button>
                </div>

                <div className="imageContainer">
                  <canvas
                    className="canvas filterCanvas"
                    ref={el => {
                      this._filterCanvas = el;
                    }}
                    width={`${this.state.canvasWidth}`}
                    height={`${this.state.canvasHeight}`}
                  />
                  <canvas
                    className="canvas drawCanvas"
                    ref={el => {
                      this._drawCanvas = el;
                    }}
                    width={`${this.state.canvasWidth}`}
                    height={`${this.state.canvasHeight}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  openModal = () => {
    this.setState({
      open: true,
      canvasWidth: this.props.width,
      canvasHeight: this.props.height
    });

    window.addEventListener("click", event => {
      if (event.target === ReactDOM.findDOMNode(this._modal)) {
        this.setState({ open: false });
      }
    });
  };

  draw = (canvas, context) => {
    let canvasx = canvas.getBoundingClientRect().left;
    let canvasy = canvas.getBoundingClientRect().top;
    let last_mousex = 0;
    let last_mousey = 0;
    let mousex = 0;
    let mousey = 0;
    let mousedown = false;
    canvas.onmousedown = e => {
      last_mousex = mousex = parseInt(e.clientX - canvasx, 10);
      last_mousey = mousey = parseInt(e.clientY - canvasy, 10);
      mousedown = true;
    };

    //Mouseup
    canvas.onmouseup = e => {
      mousedown = false;
    };

    //Mousemove
    canvas.onmousemove = e => {
      mousex = parseInt(e.clientX - canvasx, 10);
      mousey = parseInt(e.clientY - canvasy, 10);
      if (mousedown) {
        context.beginPath();
        if (this.state.drawTool === "draw") {
          context.globalCompositeOperation = "source-over";
          context.strokeStyle = this.state.colorDraw;
          context.lineWidth = this.state.drawSize;
        } else {
          context.globalCompositeOperation = "destination-out";
          context.lineWidth = this.state.drawSize;
        }
        context.moveTo(last_mousex, last_mousey);
        context.lineTo(mousex, mousey);
        context.lineJoin = context.lineCap = "round";
        context.stroke();
      }
      last_mousex = mousex;
      last_mousey = mousey;
    };
  };

  drawTool = e => {
    if (this.state.drawTool === "draw") {
      e.target.className = "activeEraser eraser";
      this.setState({ drawTool: "erase" });
    } else {
      e.target.className = "eraser";
      this.setState({ drawTool: "draw" });
    }
  };

  addText = e => {
    let context = this.drawContext;
    context.globalCompositeOperation = "source-over";
    context.fillStyle = this.state.colorDraw;
    context.font = `bold ${e.target.size.value}px Arial`;
    context.fillText(
      `${e.target.textField.value}`,
      e.target.x.value,
      e.target.y.value
    );
    e.target.textField.value = e.target.x.value = e.target.y.value = e.target.size.value =
      "";
    e.preventDefault();
  };

  reset = () => {
    if (this.drawContext) {
      this.drawContext.clearRect(
        0,
        0,
        this.state.canvasWidth,
        this.state.canvasHeight
      );
    }
    this.setState({
      grayscale: 0,
      blur: 0,
      brightness: 100,
      contrast: 100,
      hueRotate: 0,
      invert: 0,
      saturate: 100,
      sepia: 0
    });
  };

  save = () => {
    let filterCanvas = ReactDOM.findDOMNode(this._filterCanvas);

    filterCanvas.getContext("2d").drawImage(this.drawCanvas, 0, 0);
    this.drawContext.drawImage(filterCanvas, 0, 0);
    const imgDataURL = filterCanvas.toDataURL();

    // send to UploadPhoto component
    this.props.returnPhoto(imgDataURL);
    this.setState({ open: false });
  };
}
