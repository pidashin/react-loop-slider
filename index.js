import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'

@withGesture
class App extends Component {
  static defaultProps = {
    items: ['purple', 'red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'red']
  }

  constructor() {
    super();
    this.state = {
      idx: 0,
      transition: null,
      immediate: false
    };
  }

  componentWillReceiveProps(nextProps){
    const {xDelta, down} = nextProps
    const {idx} = this.state

    if(this.props.down && !down){
      const absDelta = Math.abs(xDelta)
      const steps = (Math.floor(absDelta / 300) + (absDelta % 300 > 150 ? 1 : 0)) * (xDelta > 0 ? 1 : -1)

      let nextIdx = idx + steps, transition = 'none', immediate = true
      if(nextIdx < -6)
        nextIdx = 0
      else if(nextIdx > 0)
        nextIdx = -6
      else{
        transition = null
        immediate = false
      }
        

      this.setState({
        idx: nextIdx, transition, immediate
      })
    }
  }

  render() {
    const { xInitial, xDelta, down, items } = this.props
    const { idx, transition, immediate } = this.state

    const base = (idx - 1) * 300

    return (
      <div>
        <Spring native to={{ x: down ? base + xDelta : base }} immediate={immediate} >
          {
            ({ x }) => (
              <div className="slider">
                <animated.div className="wrap" 
                  style={{
                    transition: transition,
                    transform: x.interpolate(x => `translateX(${x}px)`)
                    }}>
                  {
                    items.map((tmp, idx) => {
                      return <div className={`item ${tmp}`}>{tmp}</div>
                    })
                  }
                </animated.div>
              </div>
            )
          }
        </Spring>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
