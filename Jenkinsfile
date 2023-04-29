pipeline {
  agent {
    docker {
      image 'node:16'
      args '-p 4200:3001 --name as_des_mots_frontend'
    }

  }
  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Install Dependencies'
        sh 'node --version '
        sh 'npm i'
        echo 'Installation Complete'
      }
    }

    stage('Build') {
      steps {
        sh "chmod +x -R ${env.WORKSPACE}"
        sh './jenkins/scripts/build.sh'
        echo 'Build Complete'
      }
    }

    stage('Deploy') {
      steps {
        sh './jenkins/scripts/deploy.sh'
        input 'Finished using the web site? (Click "Proceed" to continue)'
        sh './jenkins/scripts/kill.sh'
      }
    }

  }
  environment {
    CI = 'true'
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
  }
}