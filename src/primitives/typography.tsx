import type { FC, PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

export const H1: FC<PropsWithChildren<{ className?: string }>> = props => {
  return (
    <h1 className={cn('scroll-m-20 pb-8 text-3xl font-extrabold tracking-tight lg:text-5xl', props.className)}>
      {props.children}
    </h1>
  )
}

export const H2: FC<PropsWithChildren<{ className?: string }>> = props => {
  return (
    <h2
      className={cn('first:mt- mt-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight', props.className)}
    >
      {props.children}
    </h2>
  )
}

export const H3: FC<PropsWithChildren<{ className?: string }>> = props => {
  return (
    <h3 className={cn('text-1xl mt-6 scroll-m-20 font-semibold tracking-tight', props.className)}>{props.children}</h3>
  )
}

export const H4: FC<PropsWithChildren<{ className?: string }>> = props => {
  return (
    <h4 className={cn('mt-6 scroll-m-20 text-xl font-semibold tracking-tight', props.className)}>{props.children}</h4>
  )
}

export const P: FC<PropsWithChildren<{ className?: string }>> = props => {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}>{props.children}</p>
}

export const Large: FC<PropsWithChildren<{ className?: string }>> = props => {
  return <p className={cn('text-lg font-semibold', props.className)}>{props.children}</p>
}

export const Small: FC<PropsWithChildren<{ className?: string }>> = props => {
  return <small className={cn('text-sm font-medium leading-none', props.className)}>{props.children}</small>
}

export const Muted: FC<PropsWithChildren<{ className?: string }>> = props => {
  return <p className={cn('text-sm text-muted-foreground', props.className)}>{props.children}</p>
}

export const Ul: FC<PropsWithChildren<{ className?: string }>> = props => {
  return <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.className)}>{props.children}</ul>
}
