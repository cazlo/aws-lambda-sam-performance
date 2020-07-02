FROM quay.io/quarkus/ubi-quarkus-native-image:20.1.0-java11
COPY .mvn /usr/src/app/.mvn
COPY mvnw /usr/src/app/
COPY pom.xml /usr/src/app/
WORKDIR /usr/src/app
RUN ./mvnw -B de.qaware.maven:go-offline-maven-plugin:1.2.5:resolve-dependencies
COPY src src
USER root
RUN chown -R quarkus /usr/src/app
USER quarkus
RUN ./mvnw -Pnative clean package
