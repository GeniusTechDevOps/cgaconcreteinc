import fetch from 'node-fetch';
import type { RootObject, Service, LandingLocation, LandingsGallery } from '../interfaces/dbData';
import { formatDomain } from './formatDomain';
import FormatText from '../hooks/FormatText';

interface SitemapEntry {
  domain: string;
  modifiedDate: string;
  priority: number;
}

export async function fetchApiData(): Promise<SitemapEntry[]> {
  const response = await fetch(import.meta.env.API_URL as string);
  if (!response.ok) {
    throw new Error('Error al obtener datos de la API');
  }

  const apiResponse = (await response.json()) as RootObject;
  const formattedDomain = formatDomain(apiResponse.domain); // Formatea el dominio
  const currentDateISO = new Date().toISOString(); // Fecha y hora actuales en formato ISO

  // Rutas predeterminadas
  const paths = ['/', '/about', '/services', '/portfolio', '/contact'];

  // Construye las entradas del sitemap para las rutas predeterminadas
  const sitemapEntries: SitemapEntry[] = paths.map(path => ({
    domain: `${formattedDomain}${path.substring(1)}`, // Asegurarse de no duplicar el /
    modifiedDate: currentDateISO,
    priority: 0.8,
  }));

  // Función auxiliar para formatear títulos a URL amigables
  const formatTitleToPathServices = (title: string) =>
    `services/${FormatText(title)}`;

    const formatTitleToPathGallery = (title: string) =>
    `portfolio/${FormatText(title)}`;

  // Añadir rutas de servicios si landingServices está activo
  if (apiResponse.widgets?.landingServices) {
    apiResponse.services.forEach((service: Service) => {
      const servicePath = FormatText(service.title);
      sitemapEntries.push({
        domain: `${formattedDomain}${servicePath}`,
        modifiedDate: currentDateISO,
        priority: 0.8,
      });
    });
  }

  // Añadir rutas de áreas que sirves si areasWeServe está activo
  if (apiResponse.widgets?.areasWeServe) {
    apiResponse.landingLocations?.forEach((location: LandingLocation) => {
      const locationPath = `areas-we-serve/${location.slug}`;
      sitemapEntries.push({
        domain: `${formattedDomain}${locationPath}`,
        modifiedDate: currentDateISO,
        priority: 0.8,
      });
    });
  }

  // Añadir rutas de la galería de aterrizaje si landingGallery está activo
  if (apiResponse.widgets?.landingGallery) {
    apiResponse.landingsGallery.forEach((gallery: LandingsGallery) => {
      const galleryPath = formatTitleToPathGallery(gallery.nameLanding);
      sitemapEntries.push({
        domain: `${formattedDomain}${galleryPath}`,
        modifiedDate: currentDateISO,
        priority: 0.8, // Considerar ajustar la prioridad según la importancia de la página
      });
    });
  }

  return sitemapEntries;
}
