import { projects as fallbackProjects } from "@/data/projects";
import type { PortfolioProject } from "@/data/projects";
import { testimonials as fallbackTestimonials, type Testimonial } from "@/data/testimonials";

// ─────────────────────────────────────────────────────────
// A) Generic GraphQL fetcher
// ─────────────────────────────────────────────────────────

async function fetchGraphQL(
  query: string,
  variables?: Record<string, unknown>
): Promise<unknown> {
  const url = process.env.WORDPRESS_API_URL || "https://cms.aialabcmr.com/graphql";

  if (!url) {
    console.error("[wordpress] WORDPRESS_API_URL is not defined");
    return null;
  }

  try {
    const isDev = process.env.NODE_ENV === "development";
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*"
      },
      body: JSON.stringify({ query, variables }),
      next: isDev ? { revalidate: 0 } : { revalidate: 3600 },
    });

    // Guard: if the response isn't JSON (e.g. WordPress returned an HTML error page),
    // bail out gracefully instead of crashing JSON.parse.
    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok || !contentType.includes("application/json")) {
      if (res.status === 403 && contentType.includes("text/html")) {
        console.error(
          `[wordpress] 403 Forbidden: Non-JSON HTML response. This is caused by Hostinger CDN (HCDN) Browser Integrity Check / DDoS Protection blocking API requests. To resolve this, disable DDoS Protection or Browser Integrity Check for cms.aialabcmr.com in your Hostinger control panel.`
        );
      } else {
        console.error(
          `[wordpress] Non-JSON response (status ${res.status}, content-type: ${contentType})`
        );
      }
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error("[wordpress] GraphQL errors:", JSON.stringify(json.errors, null, 2));
    }

    return json.data ?? null;
  } catch (error) {
    console.error("[wordpress] fetchGraphQL failed:", error);
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// B) TypeScript interfaces (raw GraphQL nodes)
// ─────────────────────────────────────────────────────────

interface WPImageNode {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: { width: number; height: number };
  } | null;
}

interface WPProjectNode {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  featuredImage: WPImageNode | null;
  projectDetails: {
    tagline: string | null;
    location: string | null;
    headline: string | null;
    client: string | null;
    storyParagraph1: string | null;
    storyParagraph2: string | null;
    imagePrincipale: WPImageNode | null;
    imageGalerie2: WPImageNode | null;
    imageGalerie3: WPImageNode | null;
    imageGalerie4: WPImageNode | null;
    imageGalerie5: WPImageNode | null;
  } | null;
  projectCategories: {
    nodes: Array<{ name: string; slug: string }>;
  };
  projectServices: {
    nodes: Array<{ name: string; slug: string }>;
  };
}

interface WPTestimonialNode {
  id: string;
  databaseId: number;
  title: string;
  testimonialDetails: {
    role: string | null;
    text: string | null;
  } | null;
}



// ─────────────────────────────────────────────────────────
// C) Query GET_PROJECTS
// ─────────────────────────────────────────────────────────

const GET_PROJECTS = `
  query GetProjects {
    projets(first: 50) {
      nodes {
        id
        databaseId
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        projectDetails {
          tagline
          location
          headline
          client
          storyParagraph1
          storyParagraph2
          imagePrincipale {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
          imageGalerie2 {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
          imageGalerie3 {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
          imageGalerie4 {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
          imageGalerie5 {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
        projectCategories {
          nodes { name slug }
        }
        projectServices {
          nodes { name slug }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────
// D) Query GET_TESTIMONIALS
// ─────────────────────────────────────────────────────────

const GET_TESTIMONIALS = `
  query GetTestimonials {
    tMoignages(first: 100) {
      nodes {
        id
        databaseId
        title
        testimonialDetails {
          role
          text
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────
// E) Mapper: WPProjectNode → PortfolioProject
// ─────────────────────────────────────────────────────────

/**
 * Normalise une chaîne en Title Case pour éviter les doublons
 * de casse (ex: "branding" → "Branding", "web design" → "Web Design").
 */
function titleCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function mapProjectNode(node: WPProjectNode): PortfolioProject {
  const details = node.projectDetails;
  const gallery = [
    details?.imagePrincipale?.node?.sourceUrl,
    details?.imageGalerie2?.node?.sourceUrl,
    details?.imageGalerie3?.node?.sourceUrl,
    details?.imageGalerie4?.node?.sourceUrl,
    details?.imageGalerie5?.node?.sourceUrl,
  ].filter((url): url is string => Boolean(url));

  const rawCategory = node.projectCategories?.nodes?.[0]?.name ?? "";

  return {
    id: node.slug,
    name: node.title,
    tagline: details?.tagline ?? "",
    location: details?.location ?? "",
    headline: details?.headline ?? node.title,
    client: details?.client ?? "",
    story: [
      details?.storyParagraph1 ?? "",
      details?.storyParagraph2 ?? "",
    ],
    image:
      node.featuredImage?.node?.sourceUrl ??
      gallery[0] ??
      "",
    category: rawCategory ? titleCase(rawCategory) : "",
    services: node.projectServices?.nodes?.map((s) => titleCase(s.name)) ?? [],
    gallery,
  };
}

// ─────────────────────────────────────────────────────────
// F) Mapper: WPTestimonialNode → Testimonial
// ─────────────────────────────────────────────────────────

function mapTestimonialNode(node: WPTestimonialNode): Testimonial {
  return {
    name: node.title,
    role: node.testimonialDetails?.role ?? "",
    text: node.testimonialDetails?.text ?? "",
  };
}

// ─────────────────────────────────────────────────────────
// G) Export getProjects()
// ─────────────────────────────────────────────────────────

export async function getProjects(): Promise<PortfolioProject[]> {
  try {
    const data = await fetchGraphQL(GET_PROJECTS);
    if (!data) {
      console.warn("[wordpress] Falling back to local static projects data.");
      return fallbackProjects;
    }
    const nodes = (data as any)?.projets?.nodes ?? [];
    if (nodes.length === 0) {
      console.warn("[wordpress] No projects returned from WordPress, falling back to local static projects data.");
      return fallbackProjects;
    }
    return nodes.map(mapProjectNode);
  } catch (error) {
    console.error("getProjects failed, using fallback:", error);
    return fallbackProjects;
  }
}

// ─────────────────────────────────────────────────────────
// H) Export getTestimonials()
// ─────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await fetchGraphQL(GET_TESTIMONIALS);
    if (!data) {
      console.warn("[wordpress] Falling back to local static testimonials data.");
      return fallbackTestimonials;
    }
    const nodes = (data as any)?.tMoignages?.nodes ?? [];
    if (nodes.length === 0) {
      console.warn("[wordpress] No testimonials returned from WordPress, falling back to local static testimonials data.");
      return fallbackTestimonials;
    }
    return nodes.map(mapTestimonialNode);
  } catch (error) {
    console.error("getTestimonials failed, using fallback:", error);
    return fallbackTestimonials;
  }
}
