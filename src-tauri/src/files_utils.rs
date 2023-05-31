use converter_buddy::{format::Format, converter::{PngConverter, ConverterInfo, GifConverter, JpegConverter, SvgConverter, TiffConverter, BmpConverter, WebPConverter}};

pub fn to_pascal_case(s: &str) -> String {
    let mut output_string: String = s.to_lowercase();

    if output_string == "jpg" {
        output_string = String::from("Jpeg");
    }else {
        output_string = String::from(s);
    }

    let words: Vec<&str> = output_string.split_whitespace().collect();
    let pascal_words: Vec<String> = words
        .iter()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(first_char) => {
                    let capitalized: String = first_char.to_uppercase().collect();
                    capitalized + chars.as_str()
                }
            }
        })
        .collect();

    pascal_words.join("")
}

fn supported_string_formats(formats_vec: Vec<Format>) -> Vec<String> {
        let mut string_formats: Vec<String> = vec![];

        for format in formats_vec {
            string_formats.push(format.to_string())
        }

        string_formats
}

#[tauri::command]
pub fn get_supported_input_formats() -> String{
    serde_json::to_string(&supported_string_formats(Format::supported_formats())).unwrap()
}

#[tauri::command]
pub fn is_file_format_valid(input_format: &str) -> bool {
    if input_format.to_lowercase() == "jpg".to_string() {
        return true;
    }

    for format in supported_string_formats(Format::supported_formats()) {
        if to_pascal_case(&format.to_lowercase()) == to_pascal_case(&input_format.to_lowercase()) {
            return true;
        }
    }

    false
}

#[tauri::command]
pub fn get_output_formats(input_format: &str) -> String {
    let vec: Vec<String> = Vec::new();

    let adapted_name: String = to_pascal_case(&input_format.to_lowercase());

    println!("input format {}", adapted_name);

    match adapted_name.as_str() {
        "Png" => serde_json::to_string(&supported_string_formats(PngConverter.supported_formats())).unwrap(),
        "Jpeg" => serde_json::to_string(&supported_string_formats(JpegConverter.supported_formats())).unwrap(),
        "Gif" => serde_json::to_string(&supported_string_formats(GifConverter.supported_formats())).unwrap(),
        "Svg" => serde_json::to_string(&supported_string_formats(SvgConverter.supported_formats())).unwrap(),
        "Tiff" => serde_json::to_string(&supported_string_formats(TiffConverter.supported_formats())).unwrap(),
        "Bmp" => serde_json::to_string(&supported_string_formats(BmpConverter.supported_formats())).unwrap(),
        "WebP" => serde_json::to_string(&supported_string_formats(WebPConverter.supported_formats())).unwrap(),
        _ => serde_json::to_string(&vec).unwrap(),
    }
}

pub fn get_format(format: &str) -> Option<Format> {
    let format: String = to_pascal_case(format);

    match format.as_str() {        
        "Png" => Some(Format::Png),
        "Jpeg" | "Jpg" => Some(Format::Jpeg),       
        "Gif" => Some(Format::Gif),
        "Svg" => Some(Format::Svg),
        "Tiff" => Some(Format::Tiff),
        "Bmp" => Some(Format::Bmp),
        "WebP" => Some(Format::WebP),        
        "Pdf" => Some(Format::Pdf),
        "Pnm" => Some(Format::Pnm),        
        "Tga" => Some(Format::Tga),
        "Dds" => Some(Format::Dds),
        "Ico" => Some(Format::Ico),
        "Hdr" => Some(Format::Hdr),
        "Avif" => Some(Format::Avif),
        _ => None
    }
}