export interface UbigeoDepartment {
    ubigeo_departamentos   : Department[]
}

export interface Department {
	id : number,
	departamento : string,
	ubigeo : string
}



export interface UbigeoProvince {
	ubigeo_provincias : Province[]
}

export interface Province {
	id : number,
	provincia : string,
	ubigeo : string,
	departamento : string
}

export interface District {
	id : number,
	distrito : string,
	ubigeo : string,
	provincia : string,
	departamento_id : number
}