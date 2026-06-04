const url = "https://cms.aialabcmr.com/graphql";

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

function mapProjectNode(node) {
  const details = node.projectDetails;
  const gallery = [
    details?.imagePrincipale?.node?.sourceUrl,
    details?.imageGalerie2?.node?.sourceUrl,
    details?.imageGalerie3?.node?.sourceUrl,
    details?.imageGalerie4?.node?.sourceUrl,
    details?.imageGalerie5?.node?.sourceUrl,
  ].filter(url => Boolean(url));

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
    category: node.projectCategories?.nodes?.[0]?.name ?? "",
    services: node.projectServices?.nodes?.map((s) => s.name) ?? [],
    gallery,
  };
}

async function test() {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PROJECTS }),
    });
    const json = await res.json();
    console.log("Raw GraphQL Response projects nodes:");
    console.log(JSON.stringify(json.data?.projets?.nodes, null, 2));

    const mapped = json.data?.projets?.nodes.map(mapProjectNode);
    console.log("Mapped results:");
    console.log(JSON.stringify(mapped, null, 2));
  } catch (err) {
    console.error("Test failed with error:", err);
  }
}

test();
