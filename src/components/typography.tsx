// https://ui.shadcn.com/docs/components/typography
import type { FC, PropsWithChildren } from 'react'

export const H1: FC<PropsWithChildren> = props => {
  return <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>{props.children}</h1>
}

export const H2: FC<PropsWithChildren> = props => {
  return <h2 className='first:mt- scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight'>{props.children}</h2>
}

export const H3: FC<PropsWithChildren> = props => {
  return <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>{props.children}</h3>
}

export const H4: FC<PropsWithChildren> = props => {
  return <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>{props.children}</h4>
}

export const P: FC<PropsWithChildren> = props => {
  return <p className='leading-7 [&:not(:first-child)]:mt-6'>{props.children}</p>
}

export const Large: FC<PropsWithChildren> = props => {
  return <p className='text-lg font-semibold'>{props.children}</p>
}

export const Small: FC<PropsWithChildren> = props => {
  return <small className='text-sm font-medium leading-none'>{props.children}</small>
}

export const Muted: FC<PropsWithChildren> = props => {
  return <p className='text-sm text-muted-foreground'>{props.children}</p>
}

export const Ul: FC<PropsWithChildren> = props => {
  return <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>{props.children}</ul>
}
