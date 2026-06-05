const fs = require("fs");
const path = require("path");

const url = "https://cms.aialabcmr.com/graphql";

const query = `
  query GetTaxonomies {
    taxonomies {
      nodes {
        name
        graphqlSingleName
        graphqlPluralName
        description
      }
    }
  }
`;

async function main() {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const outputPath = path.join(__dirname, "wordpress-dump.json");
    fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), "utf-8");
    console.log("Wrote taxonomies to:", outputPath);
  } catch (err) {
    console.error("Failed to dump taxonomies:", err);
  }
}

main();
