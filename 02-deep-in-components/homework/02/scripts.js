var Timer = React.createClass({
    getInitialState: function() {
        return {
            seconds: 0,
            isPaused: false
        };
    },

    formatTime: function(time) {
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours + ':' + minutes + ':' + seconds;
    },

    componentDidMount: function() {
        this.run();
    },

    tick: function() {
        this.setState({ seconds: this.state.seconds + 1 });
    },

    pause: function() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.setState({ isPaused: true });
        }
    },

    run: function() {
        if (!this.timer) {
            this.timer = setInterval(this.tick, 1000);
            this.setState({ isPaused: false });
        }
    },

    reset: function() {
        this.setState({ seconds: 0 });
    },

    componentWillUnmount: function() {
        clearInterval(this.timer);
    },

    render: function() {
        return (
            <div className="timer">
                <div className="timer__controls">
                    <button className="timer__btn timer__btn_play" type="button" onClick={this.run}>
                        <svg className="icon" style={{width: 24, height: 24}} viewBox="0 0 24 24">
                            <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                    </button>
                    <button className="timer__btn timer__btn_pause" type="button" onClick={this.pause}>
                        <svg className="icon" style={{width: 24, height: 24}} viewBox="0 0 24 24">
                            <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>
                </div>
                <div className="timer__time">{this.formatTime(this.state.seconds)}</div>
                <div className="timer__controls">
                    <button className="timer__btn timer__btn_reset" type="button" onClick={this.reset}>
                        <svg className="icon" style={{width: 24, height: 24}} viewBox="0 0 24 24">
                            <path fill="#000000" d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Timer />,
    document.getElementById('mount-point')
);
