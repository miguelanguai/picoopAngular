import { Petition } from "./Petition";

export const PETITION_DATA: Petition[] = [
  {
    petitionId: 1,
    petitionTitle: "Solicitud de cambio",
    petitionDescription: "Esta es una solicitud para cambiar el procedimiento de solicitud de permisos.",
    petitionDate: new Date("2024-05-03T00:00:00.000Z"),
    user: {
      id: 123,
      email: "usuario@example.com",
      password: "contraseña123",
      role: "usuario_regular",
      credits: 50
    }
  },
  {
    petitionId: 2,
    petitionTitle: "Petición de aumento salarial",
    petitionDescription: "Solicitamos un aumento salarial para todos los empleados del departamento de ventas.",
    petitionDate: new Date("2024-04-20T00:00:00.000Z"),
    user: {
      id: 456,
      email: "otro_usuario@example.com",
      password: "contraseña456",
      role: "usuario_regular",
      credits: 30
    }
  },
  {
    petitionId: 3,
    petitionTitle: "Solicitud de nuevas herramientas",
    petitionDescription: "Necesitamos adquirir nuevas herramientas de desarrollo para mejorar la productividad del equipo.",
    petitionDate: new Date("2024-04-15T00:00:00.000Z"),
    user: {
      id: 789,
      email: "tercer_usuario@example.com",
      password: "contraseña789",
      role: "usuario_regular",
      credits: 40
    }
  },
  {
    petitionId: 4,
    petitionTitle: "Petición de días libres adicionales",
    petitionDescription: "Pedimos la posibilidad de tener un día libre adicional cada mes para descanso y recreación.",
    petitionDate: new Date("2024-04-10T00:00:00.000Z"),
    user: {
      id: 1011,
      email: "cuarto_usuario@example.com",
      password: "contraseña1011",
      role: "usuario_regular",
      credits: 20
    }
  },
  {
    petitionId: 5,
    petitionTitle: "Solicitud de reembolso por gastos de viaje",
    petitionDescription: "Solicitamos el reembolso de los gastos de viaje incurridos durante el último viaje de negocios.",
    petitionDate: new Date("2024-04-05T00:00:00.000Z"),
    user: {
      id: 1213,
      email: "quinto_usuario@example.com",
      password: "contraseña1213",
      role: "usuario_regular",
      credits: 25
    }
  }
]
