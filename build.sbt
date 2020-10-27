name := "dominionPlay"
 
version := "1.0" 
      
lazy val `dominionplay` = (project in file(".")).enablePlugins(PlayScala)

//resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
//resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
      
scalaVersion := "2.13.3"

libraryDependencies ++= Seq(guice)
//libraryDependencies ++= Seq("org.slf4j" % "slf4j-nop" % "1.7.26")
//libraryDependencies ++= Seq("ch.qos.logback" % "logback-classic" % "1.1.3")
//libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.4" % "test"
libraryDependencies ++= Seq("org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test)

//unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

      