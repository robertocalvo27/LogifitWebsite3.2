interface Service {
  category: string;  // o el tipo que corresponda
  // ... otros campos
}

// Y la función getServiceBySlug debería especificar que puede devolver null
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  // ... implementación
}