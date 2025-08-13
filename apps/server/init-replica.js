// Initialize MongoDB Replica Set for Transaction Support
try {
  print("Starting replica set initialization...")

  // Check if replica set is already initialized
  var status = rs.status()
  if (status.ok === 1) {
    print("Replica set already initialized")
    quit(0)
  }
} catch (e) {
  print("Replica set not initialized, proceeding with initialization...")
}

// Initialize replica set
var config = {
  _id: "rs0",
  version: 1,
  members: [
    {
      _id: 0,
      host: "mongodb:27017",
      priority: 1,
    },
  ],
}

try {
  var result = rs.initiate(config)
  print("Replica set initiation result:", JSON.stringify(result))

  if (result.ok === 1) {
    print("Replica set initialized successfully!")
    print("Waiting for replica set to become ready...")

    // Wait for the replica set to be ready
    var attempts = 0
    var maxAttempts = 30

    while (attempts < maxAttempts) {
      try {
        var status = rs.status()
        if (
          status.members &&
          status.members[0] &&
          status.members[0].state === 1
        ) {
          print("Replica set is ready! Primary node is active.")
          break
        }
        print(
          "Waiting for primary node... Attempt",
          attempts + 1,
          "of",
          maxAttempts
        )
        sleep(2000)
        attempts++
      } catch (e) {
        print("Error checking replica set status:", e.message)
        sleep(2000)
        attempts++
      }
    }

    if (attempts >= maxAttempts) {
      print("Warning: Replica set initialization may not be complete")
    }

    print("MongoDB replica set setup completed!")

    // Create admin user after replica set is initialized
    try {
      print("Creating admin user...")
      db = db.getSiblingDB("admin")
      var userResult = db.createUser({
        user: "root",
        pwd: "password",
        roles: [{ role: "root", db: "admin" }],
      })
      print("Admin user created successfully:", JSON.stringify(userResult))
    } catch (userError) {
      print("Error creating admin user:", userError.message)
    }

    print("You can now use MongoDB transactions in your application.")
  } else {
    print("Failed to initialize replica set:", JSON.stringify(result))
  }
} catch (e) {
  print("Error during replica set initialization:", e.message)
}
