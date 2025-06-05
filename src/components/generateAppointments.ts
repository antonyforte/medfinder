/* src/components/generateAppointments.ts */

/**
 * Módulo para gerar listas de agendamentos a partir de JSON estático.
 * Compatible sem dependências Node.js ou Deno específicas.
 */

// Define a interface para tipar os agendamentos
export interface Appointment {
    id: string;
    time: string;       // e.g. "09:30"
    doctor: string;     // e.g. "Dr. Silva"
    patient: string;    // e.g. "João Souza"
  }
  
  // Importa os dados JSON diretamente (Vite/ESM suporta import de JSON)
  // Ajuste o caminho conforme a posição do gerador de componentes
  import appointmentsData from "../data/appointments.json" assert { type: "json" };
  
  /**
   * Retorna os agendamentos para a data fornecida (YYYY-MM-DD).
   * @param date Objeto Date para a data desejada
   * @returns Promise<Appointment[]>
   */
  export async function generateAppointments(date: Date): Promise<Appointment[]> {
    // Formata para YYYY-MM-DD
    const iso = date.toISOString().slice(0, 10);
    
    // Retorna array de agendamentos ou vazio
    return (appointmentsData as Record<string, Appointment[]>)[iso] ?? [];
  }