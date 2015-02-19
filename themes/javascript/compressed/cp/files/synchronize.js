/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
EE.file_manager=EE.file_manager||{},EE.file_manager.sync_files=EE.file_manager.sync_files||{},EE.file_manager.sync_db=0,EE.file_manager.sync_running=0,EE.file_manager.sync_errors=[],EE.file_manager.resize_ids=[],$(document).ready(function(){$.template("sync_complete_template",$("#sync_complete_template")),$("table#dimensions").toggle_all(),EE.file_manager.sync_listen()}),EE.file_manager.sync_listen=function(){$(".tableSubmit input").click(function(e){e.preventDefault(),$(this).hide(),EE.file_manager.update_progress(),EE.file_manager.sync_files=_.toArray(EE.file_manager.sync_files);var n=_.keys(EE.file_manager.sync_sizes)[0];EE.file_manager.update_progress(0),setTimeout(function(){EE.file_manager.sync(n)},15)})},EE.file_manager.resize_ids=function(){var e=[];return $('input[name="toggle[]"]:checked').each(function(){e.push($(this).val())}),e},EE.file_manager.sync=function(e){if(EE.file_manager.sync_files.length<=0){if("y"==EE.file_manager.db_sync)return;EE.file_manager.db_sync="y"}var n=EE.file_manager.sync_files.splice(0,5);$.ajax({url:EE.BASE+"&C=content_files&M=do_sync_files",type:"POST",dataType:"json",data:{XID:EE.XID,upload_directory_id:e,sizes:EE.file_manager.sync_sizes,files:n,resize_ids:EE.file_manager.resize_ids(),db_sync:EE.file_manager.db_sync},beforeSend:function(){EE.file_manager.sync_running+=1},complete:function(){EE.file_manager.sync_running-=1,EE.file_manager.sync(e);var n=EE.file_manager.sync_file_count,r=EE.file_manager.sync_files.length,a=n-r;EE.file_manager.update_progress(Math.round(a/n*100)),EE.file_manager.finish_sync(e)},success:function(e){if("success"!=e.message_type)if("undefined"!=typeof e.errors)for(var n in e.errors)EE.file_manager.sync_errors.push("<b>"+n+"</b>: "+e.errors[n]);else EE.file_manager.sync_errors.push("<b>Undefined errors</b>")}})},EE.file_manager.get_directory_name=function(e){return $("#sync table:first tr[data-id="+e+"] td:first").text()},EE.file_manager.finish_sync=function(e){if(0==EE.file_manager.sync_running){$("#progress").hide();var n={directory_name:EE.file_manager.get_directory_name(e),files_processed:EE.file_manager.sync_file_count-EE.file_manager.sync_errors.length,errors:EE.file_manager.sync_errors,error_count:EE.file_manager.sync_errors.length};$.tmpl("sync_complete_template",n).appendTo("#sync"),0==n.error_count?$("#sync_complete ul").hide():$("#sync_complete span").hide()}},EE.file_manager.update_progress=function(e){var n=$("#progress"),r=$("#progress_bar");n.is(":not(:visible)")&&n.show(),r.progressbar({value:e})};