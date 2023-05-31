mod files_utils;
mod convertions;

use crate::{files_utils::{is_file_format_valid, get_output_formats, get_supported_input_formats}, convertions::convert_file};

//Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![is_file_format_valid, get_output_formats, get_supported_input_formats, convert_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
