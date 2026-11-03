export interface IMenuIcon {
    name : string,
    description: string,
    icon : string
}
  
export const MenuIcon : IMenuIcon[] = [
  {
    name : 'Telefono',
    description : '987456132',
    icon: 'fa-duotone fa-solid fa-phone-volume'
  },
  {
    name : 'Ubicación',
    description : 'Jr. Calixto #123',
    icon: 'fa-solid fa-location-dot'
  },
  {
    name : 'Horario',
    description : '10:00 a.m - 06:00 p.m',
    icon: 'fa-regular fa-clock'
  }
]