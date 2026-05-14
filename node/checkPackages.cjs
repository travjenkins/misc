const packagesToCheck = {
  // List of packages and _specific_ versions you are looking for
  // "package" : ["1.1.1"],
  // "@package/sub": ["1.1.1", "2.2.2"]
};

const { execSync } = require("child_process");

function parseYarnListOutput(output) {
  const packages = new Map();
  const lines = output.split("\n");

  for (const line of lines) {
    // Match lines like: "├─ @babel/core@7.22.5" or "│  ├─ package-name@1.2.3"
    const match = line.match(/[├│└─\s]+([^@\s]+)@([^\s]+)/);
    if (match) {
      const [, packageName, version] = match;

      if (!packages.has(packageName)) {
        packages.set(packageName, new Set());
      }
      packages.get(packageName).add(version);
    }
  }

  return packages;
}

function checkYarnDependencies() {
  try {
    console.log("Running yarn list... (this may take a moment)\n");

    // Run yarn list and capture output
    // Using --depth=0 would only show direct dependencies, removing it shows all
    const output = execSync("yarn list --no-progress", {
      encoding: "utf8",
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer for large projects
      stdio: ["pipe", "pipe", "pipe"], // Suppress stderr warnings
    });

    const installedPackages = parseYarnListOutput(output);

    console.log(`Found ${installedPackages.size} total packages installed\n`);

    const matches = [];

    for (const [pkg, versions] of Object.entries(packagesToCheck)) {
      if (installedPackages.has(pkg)) {
        console.debug(` checking for ${pkg} `, versions);
        const installedVersions = Array.from(installedPackages.get(pkg));
        const matchedVersions = installedVersions.filter((v) =>
          versions.includes(v),
        );

        if (matchedVersions.length > 0) {
          matches.push({
            package: pkg,
            installedVersions: installedVersions,
            matchedVersions: matchedVersions,
            hasExactMatch: true,
          });
        } else {
          matches.push({
            package: pkg,
            installedVersions: installedVersions,
            matchedVersions: null,
            hasExactMatch: false,
          });
        }
      }
    }

    if (matches.length === 0) {
      console.log("✓ No matching packages found - your project is clear!");
    } else {
      console.log(`⚠ Found ${matches.length} packages from the list:\n`);

      const exactMatches = matches.filter((m) => m.hasExactMatch);
      const differentVersions = matches.filter((m) => !m.hasExactMatch);

      if (exactMatches.length > 0) {
        console.log("=== EXACT VERSION MATCHES ===");
        exactMatches.forEach((m) => {
          console.log(`✓ ${m.package}:`);
          console.log(`  Matched versions: ${m.matchedVersions.join(", ")}`);
          if (m.installedVersions.length > m.matchedVersions.length) {
            console.log(
              `  Other installed: ${m.installedVersions.filter((v) => !m.matchedVersions.includes(v)).join(", ")}`,
            );
          }
        });
        console.log(`\nTotal exact matches: ${exactMatches.length}`);
      }

      if (differentVersions.length > 0) {
        console.log("\n=== PACKAGES FOUND (different versions) ===");
        differentVersions.forEach((m) => {
          console.log(`○ ${m.package}:`);
          console.log(`  Installed: ${m.installedVersions.join(", ")}`);
          console.log(
            `  Looking for: ${packagesToCheck[m.package].join(", ")}`,
          );
        });
        console.log(
          `\nTotal with different versions: ${differentVersions.length}`,
        );
      }
    }

    return matches;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(
        "Error: yarn command not found. Please ensure yarn is installed.",
      );
    } else {
      console.error("Error running yarn list:", error.message);
    }
    return null;
  }
}

// Run the check
checkYarnDependencies();