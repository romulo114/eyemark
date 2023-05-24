/** @format */

import { AxiosError } from "axios"
import { signupInterface } from "@/@types/apiTypes/auth.types"
import { SVGProps } from "react"

export type contextClassType = {
	success: string
	error: string
	info: string
	warning: string
	default: string
	dark: string
}

export interface AppError extends AxiosError {
	data: any
}

export type canvasType = HTMLCanvasElement | null

export enum statusType {
	"ON HOLD" = "ON HOLD",
	COMPLETED = "COMPLETED",
	"ON GOING" = "ON GOING",
	"NOT STARTED" = "NOT STARTED",
	ABANDONED = "ABANDONED",
	CANCELED = "CANCELED",
}

export enum statusCount {
	"on_hold" = "on_hold",
	completed = "completed",
	"ongoing" = "ongoing",
	"not_started" = "not_started",
	abandoned = "abandoned",
}

export enum categoriesEnum {
	"sectors" = "sectors",
	"ministries" = "ministries",
	"states" = "states",
}

export type userTypeProp = {
	auth_modal?: boolean
}

export type authComponentType = {
	auth_modal?: boolean
	close?: () => void
	settings?: boolean
	runHandleInterests?: number
	passInterestsLength?: (param: any) => void
}

export type RegisterThunk = {
	payload: signupInterface
	auth_modal?: boolean
	cb?: () => void
}

export interface svgPropType extends SVGProps<SVGSVGElement> {
	active?: boolean
}
