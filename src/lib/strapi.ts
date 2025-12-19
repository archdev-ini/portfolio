import qs from "qs";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the Strapi URL
  return `${getStrapiURL()}${url}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  if (process.env.STRAPI_API_TOKEN) {
    // @ts-expect-error Authorization header might not be in the type definition of mergedOptions yet
    mergedOptions.headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  try {
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        if (response.status === 404) {
             return null; // Not found is fine, we handle it
        }
        console.error(response.statusText);
        return null; 
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from Strapi: ${error}`);
    return null;
  }
}

// Types matching our Strapi schemas (referenced in implementation plan)
// Types matching our Strapi schemas (referenced in implementation plan)
export interface StrapiMetric {
  id: number;
  [key: string]: unknown;
}

export interface StrapiCollection<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingle<T> {
    data: T | null;
}
