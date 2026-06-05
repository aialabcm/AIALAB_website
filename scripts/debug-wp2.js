const url = "https://cms.aialabcmr.com/graphql";

// Try with the exact casing from taxonomy registration
const query = `
  query GetProjects {
    projets(first: 10) {
      nodes {
        id
        title
        slug
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

async function main() {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

main();
