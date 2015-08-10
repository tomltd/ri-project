/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{

            width: '1600px',
            suffix: '-medium-x2',
            quality: 70

          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images-dev/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images-dev'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images-dev']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images-dev/'
        }]
      },
    },
/*
    pagespeed: {
  options: {
    nokey: true,
    url: "192.168.0.4:90"
  },
  prod: {
    options: {
      url: "192.168.0.4:90",
      locale: "en_GB",
      strategy: "desktop",
      threshold: 80
    }
  },
  paths: {
    options: {
      paths: ["/"],
      locale: "en_GB",
      strategy: "desktop",
      threshold: 80
    }
  }
}
*/

cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'css',
      src: ['*.css', '!*.min.css'],
      dest: 'css',
      ext: '.min.css'
    }]
  }
},



  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
/*   grunt.loadNpmTasks('grunt-cwebp');
 grunt.loadNpmTasks('grunt-pagespeed');*/
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'cssmin']);

};
