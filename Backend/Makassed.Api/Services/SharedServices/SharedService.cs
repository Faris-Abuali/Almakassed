using iText.Kernel.Pdf;

namespace Makassed.Api.Services.SharedServices;

public class SharedService : ISharedService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IHttpContextAccessor _accessor;
    
    public SharedService(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor accessor)
    {
        _webHostEnvironment = webHostEnvironment;
        _accessor = accessor;
    }
    public async Task<string> GetFilePathUrl(IFormFile file)
    {
        var localFilePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Files", $"{file.FileName}");

        await using var stream = new FileStream(localFilePath, FileMode.Create);
        await file.CopyToAsync(stream);
        
        var urlFilePath = $"{_accessor.HttpContext?.Request.Scheme}://{_accessor.HttpContext?.Request.Host}{_accessor.HttpContext?.Request.PathBase}/Files/{file.FileName}";         

        return urlFilePath;
    }
    
    public int GetFilePageCount(IFormFile file)
    {
        using PdfDocument pdfDoc = new PdfDocument(new PdfReader(file.OpenReadStream()));
        return pdfDoc.GetNumberOfPages();
    }

    public string GetCode(string parentName, string name, int siblingsCount)
    {
        var parentAbbreviation = new string(parentName.Split(' ').Select(s => s[0]).ToArray());

        var instanceNameAbbreviation = new string(name.Split(' ').Select(s => s[0]).ToArray());

        return $"{parentAbbreviation.ToUpper()}. {instanceNameAbbreviation.ToUpper()} -{siblingsCount + 1}";
    }

    public string UpdateCode(string oldCode, string newName, int index)
    {
        var abbreviationToChange = new string(newName.Split(' ').Select(s => s[0]).ToArray());
        
        var codeParts = oldCode.Split(' ');

        return index == 0 ? $"{abbreviationToChange.ToUpper()}. {codeParts[1]} {codeParts[2]}" : $"{codeParts[0]} {abbreviationToChange.ToUpper()} {codeParts[2]}";
    }
    
    
}