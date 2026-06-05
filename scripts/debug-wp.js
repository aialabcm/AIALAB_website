const fs = require("fs");
const path = require("path");

const url = "https://cms.aialabcmr.com/graphql";

// 1) Check all taxonomies registered
const queryTaxonomies = `
  query GetTaxonomies {
    taxonomies {
      nodes {
        name
        graphqlSingleName
        graphqlPluralName
        description
        connectedContentTypes {
          nodes { name graphqlSingleName }
        }
      }
    }
  }
`;

// 2) Check projects with ALL possible taxonomy fields  
const queryProjects = `
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
        categories {
          nodes { name slug }
        }
      }
    }
  }
`;

// 3) Introspect the projet type to see available fields
const queryIntrospect = `
  query IntrospectProjet {
    __type(name: "Projet") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

async function run(label, query) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    console.log(`\n===== ${label} =====`);
    console.log(JSON.stringify(json, null, 2));
    return json;
  } catch (err) {
    console.error(`Failed: ${label}`, err);
  }
}

async function main() {
  const t = await run("TAXONOMIES", queryTaxonomies);
  const p = await run("PROJECTS", queryProjects);
  const i = await run("INTROSPECT Projet", queryIntrospect);
  
  // Save everything
  const out = { taxonomies: t, projects: p, introspect: i };
  const outPath = path.join(__dirname, "debug-wp-output.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf-8");
  console.log("\n✅ Full output saved to:", outPath);
}

main();
