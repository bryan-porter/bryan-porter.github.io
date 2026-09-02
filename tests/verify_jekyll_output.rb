# frozen_string_literal: true

site_directory = File.expand_path("../_site", __dir__)
sitemap_path = File.join(site_directory, "sitemap.xml")
robots_path = File.join(site_directory, "robots.txt")

missing = [sitemap_path, robots_path].reject { |path| File.file?(path) && !File.zero?(path) }
abort "Missing generated discovery files: #{missing.join(', ')}" unless missing.empty?

sitemap = File.read(sitemap_path, encoding: "UTF-8")
robots = File.read(robots_path, encoding: "UTF-8")

abort "Generated sitemap is not a URL set" unless sitemap.include?("<urlset")
abort "Generated sitemap has the wrong canonical origin" unless sitemap.include?("https://bryan-porter.com/")
abort "Generated robots.txt does not advertise the sitemap" unless robots.include?("Sitemap: https://bryan-porter.com/sitemap.xml")

puts "Verified sitemap.xml and robots.txt"
