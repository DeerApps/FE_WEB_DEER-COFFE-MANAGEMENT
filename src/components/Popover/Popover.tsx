import {
  FloatingPortal,
  type Placement,
  arrow,
  offset,
  shift,
  useFloating,
  useInteractions,
  useClick,
  useDismiss
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useId, ElementType } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const arrowRef = useRef(null)
  const { refs, context, middlewareData } = useFloating({
    open: initialOpen,
    middleware: [offset(5), shift(), arrow({ element: arrowRef })],
    placement: placement,
    strategy: 'fixed'
  })
  const click = useClick(context, {
    event: 'mousedown',
    toggle: false
  })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])
  const id = useId()

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {initialOpen && (
            <motion.div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '500px',
                transform: 'translate(-50%, -50%)',
                // backdropFilter: 'blur(3px)',
                backgroundColor: 'rgba(115, 111, 111, 0.3)',
                zIndex: 999,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              className='top-0 left-0 w-full h-full flex justify-center items-center'
              ref={refs.setFloating}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'translateY(-10px)' }}
              animate={{ opacity: 1, transform: 'translateY(0)' }}
              exit={{ opacity: 0, transform: 'translateY(-10px)' }}
              transition={{ duration: 0.2 }}
            >
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
