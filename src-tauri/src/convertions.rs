use converter_buddy::{io::ConvertibleFile, format::Format};
use std::fs;

use crate::files_utils::get_format;

#[tauri::command]
pub fn convert_file(path: &str, output_format: &str, output_path: &str) -> bool {
    let source_path: &str = path;    
    let destination_path: &str = output_path;
    println!("{}, {}", output_path, destination_path);
    fs::copy(source_path, destination_path).unwrap();

    let file: ConvertibleFile = ConvertibleFile::new(destination_path.to_lowercase().as_str());
    file.format().expect("format input dude");
    let target_format: Format = get_format(output_format).unwrap();

    match file.convert(target_format) {
        Ok(_) => true,
        Err(_) => false,
    }
}