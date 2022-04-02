import React, { useRef, useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import "./text.css"


function TextScroll({content,duration=3}) {
  const defaultState = {
    contentWidth: 0,
    left: 0,
    duration,
  }

  const [state, setState] = useState(defaultState)

  let ref = useRef()

  useEffect(() => {
    const { offsetWidth, parentElement } = ref.current

    setState({
      ...state,
      contentWidth: offsetWidth,
      left: parentElement?.offsetWidth,
    })
  }, [])

  const { contentWidth, left, duration: timing } = state

  const animationName = `marquee_${contentWidth}`

  const Text = styled.p`
    position: relative;
    left: ${left}px;
    animation: ${animationName} ${timing}s linear infinite both;
    animation-play-state: running;
    animation-fill-mode: forwards;

    @keyframes ${animationName} {
      0% {
        transform: translateX(0px);
      }

      100% {
        transform: translateX(-${contentWidth + left}px);
      }
    }
  `

  return (
    <div className="marquee_box">
      <Text ref={ref}>{content}</Text>
    </div>
  )
}

export default TextScroll
