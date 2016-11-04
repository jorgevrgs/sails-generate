/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * http://sailsjs.com/docs/reference/configuration/sails-config-globals
 */

module.exports.globals = {

  /****************************************************************************
  *                                                                           *
  * Expose the locally-installed `lodash` as a global variable (`_`), making  *
  * it accessible throughout your app.  Or use `false` instead to disable     *
  * this entirely.  (See the link above for help.)                            *
  *                                                                           *
  ****************************************************************************/

  // _: require('lodash'),

  /****************************************************************************
  *                                                                           *
  * Expose the locally-installed `async` as a global variable (`async`),      *
  * making it accessible throughout your app.  Or use `false` instead to      *
  * disable this entirely.  (See the link above for help.)                    *
  *                                                                           *
  ****************************************************************************/

  // async: require('async'),

  /****************************************************************************
  *                                                                           *
  * Whether to expose each of your app's models as global variables.          *
  * (See the link at the top of this file for more information.)              *
  *                                                                           *
  ****************************************************************************/

  // models: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose the `sails` object as a global variable (`sails`),      *
  * making it accessible throughout your app.                                 *
  *                                                                           *
  ****************************************************************************/

  // sails: true,

};