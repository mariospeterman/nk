import {
  localLandings,
  services,
  type LocalLanding,
  type ServiceId,
  type ServiceItem,
} from "@/lib/site-config";

export function getServiceById(id: ServiceId): ServiceItem {
  const service = services.find((item) => item.id === id);
  if (!service) {
    throw new Error(`Service not configured: ${id}`);
  }
  return service;
}

export function getLocalLandingBySlug(slug: LocalLanding["slug"]): LocalLanding {
  const local = localLandings.find((item) => item.slug === slug);
  if (!local) {
    throw new Error(`Local landing not configured: ${slug}`);
  }
  return local;
}
