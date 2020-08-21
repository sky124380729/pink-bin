import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName
    wrapper?: boolean
}

// wrapper的作用是如果包裹的内容本身含有transition，那么动画会覆盖本身的transition,导致BUG，因为transition不会被继承，
// 所以我们可以通过外层包一个标签给他传入transition就OK了

const Transition: React.FC<TransitionProps> = (props) => {
    const { children, classNames, animation, wrapper, ...restProps } = props
    return (
        <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

export default Transition
