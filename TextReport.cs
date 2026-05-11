class TextReport
{
    public int Lines { get; }
    public int Words { get; }
    public int Characters { get; }

    public TextReport(int lines, int words, int characters)
    {
        Lines = lines;
        Words = words;
        Characters = characters;
    }

    public override string ToString()
    {
        return $"Lines: {Lines}{Environment.NewLine}Words: {Words}{Environment.NewLine}Characters: {Characters}";
    }
}
